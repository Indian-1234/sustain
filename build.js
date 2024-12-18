const { exec } = require('child_process'); // Run terminal commands
const ora = require('ora').default; // Ensure 'ora' is correctly imported

const spinner = ora('Building your project... ⏳').start();

const buildCommand = 'npm run build'; // Replace with your actual build command

exec(buildCommand, (error, stdout, stderr) => {
  if (error) {
    spinner.fail('Build failed ❌');
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    spinner.warn('Build completed with warnings ⚠️');
    console.log(`Warnings: ${stderr}`);
  } else {
    spinner.succeed('Build completed successfully ✅');
  }

  console.log(stdout);
});
