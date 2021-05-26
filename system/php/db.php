<?php
    $dbip = "localhost"; 
    $dbid = "root";     
    $dbpassword = "lapply2635";    
    $dbname = "K_memo";     

    $conn = mysqli_connect($dbip, $dbid, $dbpassword, $dbname);

    if(!mysqli_connect_errno()) {       
        $query = $_GET["query"];
        $result = mysqli_query($conn, $query);
    
        $do = $_GET["do"];
        if($do == 'get'){
            while($row = mysqli_fetch_array($result)){
                
                print_r($row);
                echo '<br>';
            }
        }
    } else {
        echo "error ".mysqli_connect_errno()." \n";
    }

    mysqli_close($conn);
?>



?>