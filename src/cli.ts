import { Command } from 'commander';

export function getCommandLineOptions() {
  const program = new Command();

  program
    .name('png2webp-converter')
    .description('CLI to convert png/jpg to webp')
    .version('1.0.0')
    .argument('<input>', 'Input folder')
    .requiredOption('--output <output>', 'Output folder');

  program.parse();

  return {
    args: program.args,
    opts: program.opts(),
  };
}
