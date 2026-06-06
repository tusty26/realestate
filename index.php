<?php
$host = 'localhost';
$user = 'root';
$pass = ''; 
$dbname = 'realestate_db';

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

echo "<h1>Real Estate Management Portal (Vulnerable)</h1>";
echo "<p>Searching for: " . $searchTerm . "</p>"; 

?>

<form method="GET" action="index.php">
    <label>Search Properties by Title:</label>
    <input type="text" name="search" value="<?php echo $searchTerm; ?>">
    <input type="submit" value="Search">
</form>

<hr>

<h3>Property Listings</h3>
<table border="1">
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Price</th>
        <th>Location</th>
    </tr>

<?php
$sql = "SELECT * FROM properties WHERE title LIKE '%$searchTerm%'"; 

$result = mysqli_query($conn, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['title'] . "</td>";
        echo "<td>" . $row['description'] . "</td>";
        echo "<td>$" . number_format($row['price'], 2) . "</td>";
        echo "<td>" . $row['location'] . "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='5'>No properties found.</td></tr>";
}

mysqli_close($conn);
?>
</table>

<p><em>Warning: This page is broken on purpose for the demo.</em></p>
<p><a href="secure.php">Go to Secure Version</a></p>
