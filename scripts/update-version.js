const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_FILES = [
  'package.json',
  'apps/admin/package.json',
  'apps/web/package.json',
  'apps/api/package.json',
];

const VERSION_FILES = [
  'packages/riffy-utils/src/get-version/getVersion.ts',
];

function bumpVersion(version, type) {
  const parts = version.split('.').map(Number);

  switch (type) {
    case 'major':
      return `${parts[0] + 1}.0.0`;
    case 'minor':
      return `${parts[0]}.${parts[1] + 1}.0`;
    case 'patch':
      return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
    default:
      if (/^\d+\.\d+\.\d+$/.test(type)) {
        return type;
      }
      throw new Error(`Tipo de bump inválido: ${type}`);
  }
}

function updatePackageJson(filePath, newVersion) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  Archivo no encontrado: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const packageJson = JSON.parse(content);
  const oldVersion = packageJson.version;

  packageJson.version = newVersion;

  fs.writeFileSync(fullPath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log(`✅ ${filePath}: ${oldVersion} -> ${newVersion}`);
  return true;
}

function updateVersionFile(filePath, newVersion) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  Archivo no encontrado: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  const versionPattern = /APP_VERSION\s*=\s*['"]\d+\.\d+\.\d+['"]/;

  if (versionPattern.test(content)) {
    content = content.replace(versionPattern, `APP_VERSION = '${newVersion}'`);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ ${filePath}: actualizado a ${newVersion}`);
    return true;
  } else {
    console.warn(`⚠️  No se encontró APP_VERSION en ${filePath}`);
    return false;
  }
}

function getCurrentVersion() {
  const rootPackageJson = path.join(process.cwd(), 'package.json');
  const content = fs.readFileSync(rootPackageJson, 'utf8');
  const packageJson = JSON.parse(content);
  return packageJson.version;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('❌ Error: Debes especificar un tipo de bump (major, minor, patch) o una versión específica (ej: 1.2.3)');
    console.log('\nUso:');
    console.log('  node scripts/update-version.js patch   # Incrementa patch: 0.0.0 -> 0.0.1');
    console.log('  node scripts/update-version.js minor   # Incrementa minor: 0.0.0 -> 0.1.0');
    console.log('  node scripts/update-version.js major   # Incrementa major: 0.0.0 -> 1.0.0');
    console.log('  node scripts/update-version.js 1.2.3   # Establece versión específica');
    process.exit(1);
  }

  const bumpType = args[0];
  const currentVersion = getCurrentVersion();
  const newVersion = bumpVersion(currentVersion, bumpType);

  console.log(`\n🔄 Actualizando versiones...`);
  console.log(`   Versión actual: ${currentVersion}`);
  console.log(`   Nueva versión:  ${newVersion}\n`);

  let updated = 0;

  PACKAGE_JSON_FILES.forEach((file) => {
    if (updatePackageJson(file, newVersion)) {
      updated++;
    }
  });

  VERSION_FILES.forEach((file) => {
    if (updateVersionFile(file, newVersion)) {
      updated++;
    }
  });

  console.log(`\n✨ ${updated} archivo(s) actualizado(s) a versión ${newVersion}\n`);
}

main();

