$files = @(
    "src/app/page.tsx",
    "src/components/ui/propulsion-diagram.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        $content = $content -replace '#020617', '#431407' # orange-950
        $content = $content -replace '#0F172A', '#7C2D12' # orange-900
        $content = $content -replace '#1E293B', '#9A3412' # orange-800
        
        Set-Content -Path $file -Value $content -NoNewline
    }
}

# Update globals.css to remove the Slate (blue-tinted) grays and replace with Stone (warm, neutral) grays
$cssPath = "src/app/globals.css"
if (Test-Path $cssPath) {
    $css = Get-Content $cssPath -Raw
    $css = $css -replace '#0F172A', '#1C1917' # slate-900 to stone-900
    $css = $css -replace '#64748B', '#78716C' # slate-500 to stone-500
    $css = $css -replace '#F8FAFC', '#F5F5F4' # slate-50 to stone-100
    $css = $css -replace '#F1F5F9', '#E7E5E4' # slate-100 to stone-200
    $css = $css -replace '#E2E8F0', '#D6D3D1' # slate-200 to stone-300
    Set-Content -Path $cssPath -Value $css -NoNewline
}
