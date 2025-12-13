"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Upload,
  Play,
  Pause,
  RotateCcw,
  Gamepad2,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { SYSTEMS, System } from "@/config/system";

export default function MegaDriveEmulator() {
  const [romLoaded, setRomLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [romName, setRomName] = useState("")
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const romUrlRef = useRef<string | null>(null)
  const [selectedSystem, setSelectedSystem] = useState<System>(SYSTEMS[2]);
  const [iframeKey, setIframeKey] = useState(0)

  const startIframe = () => {
    if (!romUrlRef.current) return;

    const url = `/emulator.html?rom=${encodeURIComponent(romUrlRef.current)}&system=${selectedSystem.id}`;
    
    iframeRef.current!.src = url;
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (!romLoaded) return

    if (!isPlaying) startIframe()
    else {
      iframeRef.current!.src = "about:blank"
      setIsPlaying(false)
    }
  }

  const handleReset = () => {
    // para execução
    setIsPlaying(false)

    // limpa iframe
    iframeRef.current!.src = "about:blank"
    setIframeKey((prev) => prev + 1)

    // limpa ROM
    if (romUrlRef.current) {
      URL.revokeObjectURL(romUrlRef.current)
      romUrlRef.current = null
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    // limpa estados
    setRomLoaded(false)
    setRomName("")
    setError("")
  }
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    if (!file) return

    setError("")

    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (!selectedSystem.validExtensions.includes(ext)) {
      setError(`Formato inválido para ${selectedSystem.name}!`);
      return;
    }

    setRomName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const buf = e.target?.result as ArrayBuffer

      if (romUrlRef.current) {
        URL.revokeObjectURL(romUrlRef.current)
      }

      const blob = new Blob([buf], { type: "application/octet-stream" })
      romUrlRef.current = URL.createObjectURL(blob)
      setRomLoaded(true)
    }

    reader.readAsArrayBuffer(file)
  }

  const handleSystemChange = (systemName: string) => {
    const sys = SYSTEMS.find(s => s.name === systemName)
    if (!sys) return

    // 🔥 reset total antes de trocar sistema
    handleReset()

    setSelectedSystem(sys)
  }

  const formatExtensions = (exts: string[]) => exts.join(" ")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Gamepad2 className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold">RETRO BOX</h1>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="w-full max-w-5xl mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-5xl p-6 border-2">
        <div className="relative bg-secondary p-4 rounded-lg border-4">

          {/* IFRAME DO EMULADOR */}
          <iframe
            key={iframeKey}
            ref={iframeRef}
            className="w-full aspect-4/3 bg-black rounded min-h-120"
            allow="fullscreen"
          />

          {/* overlays */}
          {!romLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <Gamepad2 className="w-16 h-16 mb-4 text-primary/50" />
              <h2 className="text-2xl font-bold text-primary">{selectedSystem.name.toLocaleUpperCase()}</h2>
              <p className="text-muted-foreground">Carregue uma ROM</p>
            </div>
          )}

          {romLoaded && !isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/80 pointer-events-none">
              <div className="text-green-500 text-xl font-bold mb-2">ROM CARREGADA!</div>
              <p className="text-white">{romName}</p>
              <p className="text-green-500 mt-2">Pressione PLAY</p>
            </div>
          )}
        </div>

        {/* CONTROLES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="lg"
            className="gap-2 bg-primary"
          >
            <Upload className="w-5 h-5" /> Carregar ROM
          </Button>

          <Button
            onClick={handlePlayPause}
            disabled={!romLoaded}
            size="lg"
            className="gap-2 bg-accent"
          >
            {isPlaying ? (
              <>
                <Pause /> Pausar
              </>
            ) : (
              <>
                <Play /> Jogar
              </>
            )}
          </Button>

          <Button
            onClick={handleReset}
            disabled={!romLoaded}
            variant="outline"
            size="lg"
          >
            <RotateCcw /> Reset
          </Button>

          <Select
            value={selectedSystem.name}
            onValueChange={handleSystemChange}
          >
            <SelectTrigger
              className="
                h-11 px-4
                inline-flex w-full items-center justify-between
                rounded-md border border-input
                bg-background text-base
                shadow-sm
                hover:bg-accent hover:text-accent-foreground
                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              <SelectValue placeholder="Mega Drive" />
            </SelectTrigger>

            <SelectContent>
              {SYSTEMS.map((sys) => (
                <SelectItem key={sys.id} value={sys.name}>
                  {sys.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={selectedSystem.validExtensions.join(",")}
          onChange={handleFileUpload}
          className="hidden"
        />
      </Card>

      {/* Footer Info */}
      <div className="w-full max-w-5xl mt-8 space-y-4">
        <Card className="p-6 bg-amber-500/10 border-amber-500/50">
          <h2 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Atenção: Formatos de Arquivo
          </h2>

          <div className="space-y-2 text-sm text-foreground">
            <p className="font-semibold">
              Este é um emulador de{" "}
              <span className="uppercase">{selectedSystem.name}</span>
            </p>

            <p>
              Aceita apenas ROMs nos formatos:{" "}
              <span className="font-mono bg-amber-500/20 px-2 py-1 rounded">
                {formatExtensions(selectedSystem.validExtensions)}
              </span>
            </p>

            <p className="text-muted-foreground mt-3">
              <strong>Não funciona com:</strong>{" "}
              {SYSTEMS
                .filter(s => s.id !== selectedSystem.id)
                .map(s => `${s.name} (${formatExtensions(s.validExtensions)})`)
                .join(", ")}
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-card border border-border">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            Onde encontrar ROMs de {selectedSystem.name}?
          </h2>

          {selectedSystem.romSources ? (
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {selectedSystem.romSources.title}
                </h3>

                <ul className="list-disc list-inside space-y-1 ml-2">
                  {selectedSystem.romSources.links.map(link => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-border">
                <h3 className="font-semibold text-foreground mb-2">📝 Importante</h3>
                <p>
                  Use apenas ROMs que você possui legalmente ou jogos homebrew gratuitos da comunidade.
                </p>
                <p className="mt-1">
                  ROMs de jogos comerciais são protegidas por direitos autorais.
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Ainda não há fontes de ROMs cadastradas para este sistema.
            </p>
          )}
        </Card>

        <Card className="p-6 bg-blue-500/10 border-blue-500/50">
          <h2 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            Como jogar
          </h2>

          <div className="space-y-2 text-sm text-foreground">
            <p>
              Use o <strong>teclado</strong> para controlar o jogo:
            </p>

            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Setas</strong> — Direções (↑ ↓ ← →)</li>
              <li><strong>Enter</strong> — Start</li>
              <li><strong>Shift</strong> — Select</li>
              <li><strong>Z / X</strong> — Botões A / B</li>
              <li><strong>A / S</strong> — Botões C / Y</li>
            </ul>

            <p className="text-muted-foreground mt-2">
              💡 Os controles podem variar dependendo do sistema e do emulador.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
