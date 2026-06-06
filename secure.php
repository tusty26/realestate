<?php
$host = 'localhost';
$user = 'root';
$pass = ''; 
$dbname = 'realestate_db';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$safeSearchTerm = htmlspecialchars($searchTerm, ENT_QUOTES, 'UTF-8');

echo "<h1>Real Estate Management Portal (Secure)</h1>";
echo "<p>Searching for: " . $safeSearchTerm . "</p>";

?>

<form method="GET" action="secure.php">
    <label>Search Properties by Title:</label>
    <input type="text" name="search" value="<?php echo $safeSearchTerm; ?>">
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
$sql = "SELECT * FROM properties WHERE title LIKE ?";
$stmt = $pdo->prepare($sql);

$stmt->execute(["%$searchTerm%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($results) {
    foreach ($results as $row) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row['id']) . "</td>";
        echo "<td>" . htmlspecialchars($row['title']) . "</td>";
        echo "<td>" . htmlspecialchars($row['description']) . "</td>";
        echo "<td>$" . number_format($row['price'], 2) . "</td>";
        echo "<td>" . htmlspecialchars($row['location']) . "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='5'>No properties found securely.</td></tr>";
}
?>
</table>

<p><em>Note: This version is fully patched against SQLi and XSS.</em></p>
<p><a href="index.php">Go to Vulnerable Version</a></p>
