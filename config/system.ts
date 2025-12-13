export type System = {
  name: string;
  id: string; // identificador do EmulatorJS
  validExtensions: string[];
  romSources?: {
    title: string
    links: {
      label: string
      url: string
    }[]
  };
};

export const SYSTEMS: System[] = [
  {
    name: "Mega Drive",
    id: "segaMD",
    validExtensions: [".bin", ".md", ".gen", ".smd"],
    romSources: {
      title: "🎮 ROMs Homebrew Gratuitas e Legais",
      links: [
        {
          label: "ROMhacking.net - Homebrew Mega Drive",
          url: "https://www.romhacking.net/homebrew/",
        },
        {
          label: "Itch.io - Jogos Sega Genesis / Mega Drive",
          url: "https://itch.io/games/tag-sega-genesis",
        },
        {
          label: "PDRoms - Mega Drive Homebrew",
          url: "https://pdroms.de/megadrive",
        },
        {
          label: "GitHub - Comunidade Mega Drive",
          url: "https://github.com/topics/megadrive",
        },
      ],
    },
  },
  {
    name: "Master System",
    id: "segaSMS",
    validExtensions: [".sms", ".sg"],
     romSources: {
      title: "🎮 ROMs Homebrew Gratuitas e Legais",
      links: [
        {
          label: "SMS Power! - Homebrew & Public Domain",
          url: "https://www.smspower.org/Homebrew",
        },
        {
          label: "Itch.io - Jogos Master System",
          url: "https://itch.io/games/tag-master-system",
        },
        {
          label: "ROMhacking.net - Master System",
          url: "https://www.romhacking.net/?page=platforms&platform=sms",
        },
      ],
    },
  },
  {
    name: "Game Boy",
    id: "gb",
    validExtensions: [".gb", ".gbc"],
    romSources: {
      title: "🎮 ROMs Homebrew Gratuitas e Legais",
      links: [
        {
          label: "GBDev - Recursos e Homebrew",
          url: "https://gbdev.io/resources.html",
        },
        {
          label: "Itch.io - Jogos Game Boy",
          url: "https://itch.io/games/tag-gameboy",
        },
        {
          label: "ROMhacking.net - Game Boy",
          url: "https://www.romhacking.net/?page=platforms&platform=gb",
        },
      ],
    },
  },
  {
    name: "NES",
    id: "nes",
    validExtensions: [".nes"],
    romSources: {
      title: "🎮 ROMs Homebrew Gratuitas e Legais",
      links: [
        {
          label: "NESDev - Homebrew Games",
          url: "https://nesdev.org/wiki/Homebrew_games",
        },
        {
          label: "Itch.io - Jogos NES",
          url: "https://itch.io/games/tag-nes",
        },
        {
          label: "ROMhacking.net - NES",
          url: "https://www.romhacking.net/?page=platforms&platform=nes",
        },
      ],
    },
  },
  {
    name: "SNES",
    id: "snes",
    validExtensions: [".smc", ".sfc"],
     romSources: {
      title: "🎮 ROMs Homebrew Gratuitas e Legais",
      links: [
        {
          label: "SNES Central - Homebrew",
          url: "https://www.snescentral.com/",
        },
        {
          label: "Itch.io - Jogos SNES",
          url: "https://itch.io/games/tag-snes",
        },
        {
          label: "ROMhacking.net - SNES",
          url: "https://www.romhacking.net/?page=platforms&platform=snes",
        },
      ],
    },
  },
  {
    name: "PlayStation",
    id: "psx",
    validExtensions: [".iso", ".bin"],
     romSources: {
      title: "🎮 Homebrew & Demos Legais",
      links: [
        {
          label: "PSXDEV - Homebrew & SDK",
          url: "https://psxdev.net/",
        },
        {
          label: "Itch.io - Homebrew PlayStation",
          url: "https://itch.io/games/tag-playstation",
        },
        {
          label: "GitHub - Projetos Homebrew PSX",
          url: "https://github.com/topics/psx",
        },
      ],
    },
  },
  // adicione outros sistemas aqui...
];
