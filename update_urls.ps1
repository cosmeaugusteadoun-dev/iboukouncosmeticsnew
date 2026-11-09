$old = 'iboukouncosmetics.kesug.com'
$new = 'iboukouncosmetics.com'
Get-ChildItem -Path c:/Users/PC/Desktop/iboukoun_refonte -Recurse -File -Include *.html,*.xml,*.mjs,*.js,*.json,*.css | Where-Object { $_.FullName -notmatch 'generated' } | Where-Object { $_.FullName -notmatch 'admin' } | Where-Object { $_.FullName -notmatch 'uploads' } | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    if ($content -match $old) {
        $newContent = $content -replace $old, $new
        $newContent | Set-Content $_.FullName -Encoding UTF8
        Write-Host "Updated: $($_.Name)"
    }
}
Write-Host 'Done!'
