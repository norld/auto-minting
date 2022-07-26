# Sugar: Auto Minting

See [the docs](https://docs.metaplex.com/tools/sugar/introduction) for full installation and usage instructions.

## Installation

### Recommended Method

For macOS, Linux and Windows Subsystem Linux (WSL), run the following install script in your terminal:

```bash
bash <(curl -sSf https://sugar.metaplex.com/install.sh)
```

For Windows:

Download [this installer binary](https://github.com/metaplex-foundation/winstaller/releases/latest/download/winstaller.exe) and execute it. Since it is not a verified Windows binary you may have to choose "Run Anyway" from "More Info" on the pop-up Windows dialog.

> **Dependencies:**
> When installing on Ubuntu or WSL (Windows Subsystem Linux), you may need to install some additional dependencies:
>
> ```bash
> sudo apt install libudev-dev pkg-config unzip
> ```

### Developers

Using Crates.io:

```bash
npm install -g pnpm
```

Pnpm add module

```bash
pnpm i
```

## Quick Start

```bash
pnpm run dev
```
