<?php
    $key = "state";
    $value = "=Startet||=venter";
    $comp = " = ";
    if (count(explode("||", substr($value, 1))) > 1){
        $values = explode("||", $value);
        $value = "(";
        $i = 0;
        foreach($values as $v){
            $i++;
            $value .= $key . $comp . substr($v, 1);
            if(count($values) != $i){
                $value .= " OR ";
            }
        }
        $value .= ")";
    } else {   
        $value = substr($value, 1);
    }
    print_r($value);
?>