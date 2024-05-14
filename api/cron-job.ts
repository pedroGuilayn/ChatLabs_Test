import * as cron from 'node-cron';
import { exec } from 'child_process';

function runSeedScript() {
  exec(`ts-node ./src/seed.ts`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o seed script: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
}

//tarefa é realizada de 30 em 30 minutos
cron.schedule('*/30 * * * *', () => {
  console.log('Executando seed script...');
  runSeedScript();
});