const XLSX = require('xlsx');

const ADMINISTRADORES = [
    'Ema#0467',
    'Flor.#4880',
    'camiladomato#1148',
]
const MENTORES = [
    'Ema#0467',
    'igna.borraz#7609',
    'LucasSilva#9465',
    'Sebastian Alfonso#6569',
    'Eduardo Mendoza#7589',
    'Aymará#5492',
    'Nicolas Cirulli#3338',
    'David Cosio#9214',
    'camiladomato#1148',
    'DamianOscar#2911',
    'Guille#8481',
    'Eric Rodriguez#2797',
    'Einuvy#6102',
    'Facu Araujo#5872',
    'Fede Rouyere#9935',
    'Guille#2253',
    'Kevin Darnet#3494',
    'Lopez Zaccaro Jose#1000',
    'LucreciaGillone#5565',
    'Sil Gutierrez#9350',
    'DeddKal#7613',
    'Flor.#4880'
]
let ALUMNOS = []
const CONSULTAS = ['pregunta', 'preguntar', 'consulta', 'consultar', 'duda']

function getAlumnos() {
    // Ruta relativa al archivo XLSX
    const filePath = './data/data.xlsx';

    // Lee el archivo XLSX utilizando la biblioteca xlsx
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Obtiene las celdas utilizadas en la hoja de cálculo
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const rows = [];
    const headerRow = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
        const cell = worksheet[cellAddress];
        const columnName = cell ? cell.v : null;
        headerRow.push(columnName);
    }
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
        const rowData = {};
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
            const cell = worksheet[cellAddress];
            const columnName = headerRow[col];
            rowData[columnName] = cell ? cell.v : null;
        }
        rows.push(rowData);
    }

    ALUMNOS = rows
}

function whoAreYou(discordTag) {
    console.log(discordTag);
    let roles = []
    let admin = ADMINISTRADORES.find(admin => admin == discordTag)
    if (admin) {
        roles.push('Administrador')
    }
    let mentor = MENTORES.find(m => m == discordTag)
    if (mentor) {
        roles.push('Equipo Académico')
    }
    let alumno = ALUMNOS.find(a => a.discord == discordTag)
    if (alumno) {
        roles.push('Alumno cohort 48')
    }
    if (roles.length == 0) {
        roles.push('Sin registrar')
    }
    return roles
}

function isConsulta(msj) {
    for (word of CONSULTAS) {
        if (msj.toLowerCase().includes(word.toLowerCase())) {
            return true
        }
    }
    return false
}

function mentorName(discordTag){
    let mentor = MENTORES.find(m => m == discordTag)
    return `Capo - ${mentor}`.slice(0,-5)
}

function nickName(discordTag) {
    let alumno = ALUMNOS.find(al => al.discord == discordTag)
    return `${alumno.Nombre} ${alumno.Apellido}`
}

function sinRegistrar(discordTag) {
    console.log(discordTag);
    return 'Sin Registrar /' + discordTag
}

module.exports = { MENTORES, CONSULTAS, ALUMNOS, getAlumnos, isConsulta, whoAreYou, nickName, mentorName, sinRegistrar }