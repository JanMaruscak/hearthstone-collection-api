import React from 'react'

const Metadata = React.createContext(null)

export const MetadataProvider = Metadata.Provider
export const MetadataConsumer = Metadata.Consumer

export default Metadata