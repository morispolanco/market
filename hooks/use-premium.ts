import { useEffect, useState } from "react"

export interface PlatformAccess {
  googleAds: boolean
  facebook: boolean
  instagram: boolean
  linkedin: boolean
  tiktok: boolean
  email: boolean
  influencers: boolean
  youtube: boolean
}

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false)
  const [platformAccess, setPlatformAccess] = useState<PlatformAccess>({
    googleAds: true, // Free in demo
    facebook: true, // Free in demo
    instagram: false,
    linkedin: false,
    tiktok: false,
    email: false,
    influencers: false,
    youtube: false,
  })

  useEffect(() => {
    // In a real app, this would check for a premium subscription
    const checkPremiumStatus = () => {
      const isPremiumUser = localStorage.getItem("isPremium") === "true"
      setIsPremium(isPremiumUser)

      if (isPremiumUser) {
        setPlatformAccess({
          googleAds: true,
          facebook: true,
          instagram: true,
          linkedin: true,
          tiktok: true,
          email: true,
          influencers: true,
          youtube: true,
        })
      }
    }

    checkPremiumStatus()
  }, [])

  const togglePremium = () => {
    const newPremiumStatus = !isPremium
    localStorage.setItem("isPremium", String(newPremiumStatus))
    setIsPremium(newPremiumStatus)

    if (newPremiumStatus) {
      setPlatformAccess({
        googleAds: true,
        facebook: true,
        instagram: true,
        linkedin: true,
        tiktok: true,
        email: true,
        influencers: true,
        youtube: true,
      })
    } else {
      setPlatformAccess({
        googleAds: true,
        facebook: true,
        instagram: false,
        linkedin: false,
        tiktok: false,
        email: false,
        influencers: false,
        youtube: false,
      })
    }
  }

  return {
    isPremium,
    platformAccess,
    togglePremium,
  }
}