const BASE_URL = 'https://picsum.photos'

interface IconProps {
    url?: string
    width?: number
    height?: number
    onClick?: () => void
}

const resolveUrl = (url: string, width: number, height: number) => {
    if (url !== BASE_URL) {
        return url
    }
    return width === height
        ? BASE_URL + '/' + width
        : BASE_URL + '/' + width + '/' + height
}

export { type IconProps, BASE_URL, resolveUrl }
