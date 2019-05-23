// dropdb bpl_mainnet
// createdb bpl_mainnet

// pg_dump -O bpl_mainnet -Fc -Z6 > ~/snapshots/snapshot_1234567~
// pg_restore -O -j 8 -d bpl_mainnet ~/snapshot_0-2787549
export default () => {
  console.log('Choose a snapshot to restore')
}
