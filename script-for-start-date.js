$("input[id=start_date]").on("change", function(){
    // console.log($(this));
    // moment(this.value, "DD/MM/YY - HH:mm").add(getCompanySetting("order.create_deadline"), 'days').formatDateTimeDb();
    if ($("input[id=deadline_date]").length)
        $("input[id=deadline_date]").val(moment(this.value, "DD/MM/YY - HH:mm").add(getCompanySetting("order.create_deadline"), 'days').format("DD/MM/YY - HH:mm"))

});