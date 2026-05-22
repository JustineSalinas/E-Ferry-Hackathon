$files = Get-ChildItem -Path src -Recurse -File -Include *.tsx,*.ts,*.md
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace 'MarineSync', 'Solmate'
    $content = $content -replace 'marineSync', 'solmate'
    $content = $content -replace 'marine_sync', 'solmate'
    $content = $content -replace 'Marine Sync', 'Solmate'
    $content = $content -replace '(?i)e-bangka', 'E-FERRY'
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

$page = Get-Content src/app/page.tsx -Raw
$page = $page -replace '(<div className="flex items-center gap-3">\s*)(<Link\s*href="/login")', '$1<Link href="/login" className={cn(buttonVariants({ variant: "ghost" }), "text-[var(--color-muted-custom)] hover:text-[var(--color-text)] text-sm hidden lg:inline-flex")}>Admin Login</Link>$2'
Set-Content src/app/page.tsx -Value $page -NoNewline

$page = Get-Content src/app/page.tsx -Raw
$page = $page -replace '<Anchor className="w-6 h-6 text-\[var\(--color-accent-custom\)\] transition-transform duration-600 group-hover:rotate-\[360deg\]" />', '<img src="/solmate.png" alt="Solmate Logo" className="h-8 w-auto object-contain transition-transform duration-600 group-hover:scale-105" />'
Set-Content src/app/page.tsx -Value $page -NoNewline

$admin = Get-Content src/app/admin/page.tsx -Raw
$admin = $admin -replace '<div className="h-7 w-7 rounded bg-primary flex items-center justify-center">\s*<Anchor className="h-4 w-4 text-primary-foreground" />\s*</div>', '<img src="/solmate.png" alt="Solmate Logo" className="h-8 w-auto object-contain" />'
Set-Content src/app/admin/page.tsx -Value $admin -NoNewline

$login = Get-Content src/app/login/page.tsx -Raw
$login = $login -replace '<div className="w-8 h-8 rounded-full bg-\[var\(--color-accent-custom\)\] flex items-center justify-center">\s*<Anchor className="w-4 h-4 text-white" />\s*</div>', '<img src="/solmate.png" alt="Solmate Logo" className="h-8 w-auto object-contain" />'
Set-Content src/app/login/page.tsx -Value $login -NoNewline

$op = Get-Content src/app/operator/page.tsx -Raw
$op = $op -replace '<Anchor className="w-5 h-5 text-primary" />', '<img src="/solmate.png" alt="Solmate Logo" className="h-8 w-auto object-contain" />'
Set-Content src/app/operator/page.tsx -Value $op -NoNewline

$portal = Get-Content src/app/portal/page.tsx -Raw
$portal = $portal -replace '<div className="bg-primary p-1\.5 rounded-lg group-hover:bg-primary/90 transition-colors">\s*<Anchor className="w-5 h-5 text-primary-foreground" />\s*</div>', '<img src="/solmate.png" alt="Solmate Logo" className="h-8 w-auto object-contain" />'
Set-Content src/app/portal/page.tsx -Value $portal -NoNewline
