<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$tile = 45;

for ($i = 1; $i < 50; $i++) {
    
    $height  = $i * 12;
    $width   = $height * 2;
    
    $check_width  = ($width)  % 12;
    $check_height = ($height) % 12;
    
    if (!$check_width && !$check_height) {
        echo "<h4>" . $width . " x " . $height . "</h4>";
    }
}



