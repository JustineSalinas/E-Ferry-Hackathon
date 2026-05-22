$files = @(
    "src/app/page.tsx",
    "src/components/ui/propulsion-diagram.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Replace extremely dark blue with extremely dark slate
        $content = $content -replace '#050f1a', '#020617'
        
        # Replace dark blue with dark slate
        $content = $content -replace '#0a192f', '#0F172A'
        
        # Replace hover dark blue with hover dark slate
        $content = $content -replace '#112240', '#1E293B'
        
        # Replace medium dark blue with dark orange
        $content = $content -replace '#0c4a6e', '#9A3412'
        
        # Replace Tailwind blue classes with orange
        $content = $content -replace 'text-blue-500', 'text-[var(--color-accent-custom)]'
        $content = $content -replace 'bg-blue-500/10', 'bg-[var(--color-accent-custom)]/10'
        $content = $content -replace 'text-blue-400', 'text-[var(--color-accent-custom)]'
        
        Set-Content -Path $file -Value $content -NoNewline
    }
}
