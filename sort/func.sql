/**
 * Returns a string formatted for natural sorting. This function is very useful when having to sort alpha-numeric strings.
 *
 * @author Alexandre Potvin Latreille (plalx)
 * @param {nvarchar(4000)} string The formatted string.
 * @param {int} numberLength The length each number should have (including padding). This should be the length of the longest number. Defaults to 10.
 * @param {char(50)} sameOrderChars A list of characters that should have the same order. Ex: '.-/'. Defaults to empty string.
 *
 * @return {nvarchar(4000)} A string for natural sorting.
 * Example of use: 
 * 
 *      SELECT Name FROM TableA ORDER BY Name
 *  TableA (unordered)              TableA (ordered)
 *  ------------                    ------------
 *  ID  Name                    ID  Name
 *  1.  A1.                 1.  A1-1.       
 *  2.  A1-1.               2.  A1.
 *  3.  R1      -->         3.  R1
 *  4.  R11                 4.  R11
 *  5.  R2                  5.  R2
 *
 *  
 *  As we can see, humans would expect A1., A1-1., R1, R2, R11 but that's not how SQL is sorting it.
 *  We can use this function to fix this.
 *
 *      SELECT Name FROM TableA ORDER BY dbo.udf_NaturalSortFormat(Name, default, '.-')
 *  TableA (unordered)              TableA (ordered)
 *  ------------                    ------------
 *  ID  Name                    ID  Name
 *  1.  A1.                 1.  A1.     
 *  2.  A1-1.               2.  A1-1.
 *  3.  R1      -->         3.  R1
 *  4.  R11                 4.  R2
 *  5.  R2                  5.  R11
 */
CREATE FUNCTION dbo.udf_NaturalSortFormat(
    @string nvarchar(4000),
    @numberLength int = 10,
    @sameOrderChars char(50) = ''
)
RETURNS varchar(4000)
AS
BEGIN
    DECLARE @sortString varchar(4000),
        @numStartIndex int,
        @numEndIndex int,
        @padLength int,
        @totalPadLength int,
        @i int,
        @sameOrderCharsLen int;

    SELECT 
        @totalPadLength = 0,
        @string = RTRIM(LTRIM(@string)),
        @sortString = @string,
        @numStartIndex = PATINDEX('%[0-9]%', @string),
        @numEndIndex = 0,
        @i = 1,
        @sameOrderCharsLen = LEN(@sameOrderChars);

    -- Replace all char that has to have the same order by a space.
    WHILE (@i <= @sameOrderCharsLen)
    BEGIN
        SET @sortString = REPLACE(@sortString, SUBSTRING(@sameOrderChars, @i, 1), ' ');
        SET @i = @i + 1;
    END

    -- Pad numbers with zeros.
    WHILE (@numStartIndex <> 0)
    BEGIN
        SET @numStartIndex = @numStartIndex + @numEndIndex;
        SET @numEndIndex = @numStartIndex;

        WHILE(PATINDEX('[0-9]', SUBSTRING(@string, @numEndIndex, 1)) = 1)
        BEGIN
            SET @numEndIndex = @numEndIndex + 1;
        END

        SET @numEndIndex = @numEndIndex - 1;

        SET @padLength = @numberLength - (@numEndIndex + 1 - @numStartIndex);

        IF @padLength < 0
        BEGIN
            SET @padLength = 0;
        END

        SET @sortString = STUFF(
            @sortString,
            @numStartIndex + @totalPadLength,
            0,
            REPLICATE('0', @padLength)
        );

        SET @totalPadLength = @totalPadLength + @padLength;
        SET @numStartIndex = PATINDEX('%[0-9]%', RIGHT(@string, LEN(@string) - @numEndIndex));
    END

    RETURN @sortString;
END

GO