<?php
// php -S 192.169.1.103:8080
error_reporting(E_ALL);
include("../../common/dbddconnect.php"); 

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

function getList()
{
    global $con;
    global $response;
    $list = array();

    $sql ="select Time,Open,High,Low,Close from fxusdcad limit 1000";

    if (!($result=mysqli_query($con,$sql)))
    {
        $response->Error = 1;
        $response->Message = mysqli_error($con) ;
        return $list;
    }
    while($row = $result->fetch_assoc()) 
    {
        $record = new stdClass();
        $record->Time = $row["Time"];
        $record->Open = $row["Open"];
        $record->Close = $row["Close"];
        $record->High = $row["High"];
        $record->Low = $row["Low"];
        array_push($list, $record);
    }
    return $list;
}

$response = new stdClass();
$input = file_get_contents('php://input');
$queries = json_decode($input);
$response->Error = 0;
$response->Message = "ok";
$response->Data = getList();

echo json_encode($response);

include("../../common/dbddclose.php");

?>