declare let window: any
import { ethers } from 'ethers'

export const getSigner = async () => {
  const provider = await new ethers.providers.Web3Provider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  return provider.getSigner()
}
