module.exports = async function preInstall({ pkgManager, command, args }) {
  if (pkgManager === 'npm') {
    const legacyPeerDepsIndex = args.indexOf('--legacy-peer-deps');
    if (legacyPeerDepsIndex === -1) {
      args.push('--legacy-peer-deps');
    }
  }
  return { command, args };
};
