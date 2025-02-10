import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'
import { merge } from '@/utils/object'
import { cloneDeep } from 'es-toolkit'

const globalSettings: Settings.all =
{
  "app": {
    "colorScheme": ""
  },
  "menu": {
    "mode": "single",
    "mainMenuClickMode": "smart"
  },
  "tabbar": {
    "enable": true,
    "enableIcon": true
  }
}


export default merge(globalSettings, cloneDeep(settingsDefault)) as RecursiveRequired<Settings.all>
