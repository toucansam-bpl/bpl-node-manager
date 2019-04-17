import { extname } from 'path'


export default {
  name: 'bpl-monitor',
  cwd: __dirname,
  script: `runner${extname(__filename)}`,

  // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  autorestart: true,
  exp_backoff_restart_delay: 100,
  instances: 1,
  log_date_format: 'YYYY-MM-DD HH:mm:ss',
  watch: false,
  // max_memory_restart: '1G',
}
