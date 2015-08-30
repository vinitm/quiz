<?php
/*$year=$_GET["year"];
$date=$_GET["date"];
$shift=$_GET["shift"];
echo "papers/paper.html?year=".urlencode($year)."&date=".urlencode($date)."&shift=".urlencode($shift);*/
$file = file_get_contents('questions.txt', true);
echo $file;
?>