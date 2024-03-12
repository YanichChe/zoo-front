export function buildImageUrl(imageId: number | undefined): string {
    if (!imageId) {
        return 'https://e.profkiosk.ru/service_tbn2/yrbc4e.png'
    }

    return `http://localhost:8080/files/${imageId}`
}
