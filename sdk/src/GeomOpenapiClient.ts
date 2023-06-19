import axios from 'axios'
import { Instance, InstanceConfig } from '@/typings';

export default (config: InstanceConfig) => {
  const instance: Instance = axios.create(config)

  return {
    instance,
  }
}
