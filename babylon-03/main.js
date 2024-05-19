// @ts-nocheck

import './style.css'
import { initBabylong } from './src/babylon'

document.querySelector('#app').innerHTML = `
<canvas id="renderCanvas"></canvas>
`

initBabylong(document.getElementById('renderCanvas'))