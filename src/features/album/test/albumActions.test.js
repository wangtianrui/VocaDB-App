import { fetchSearchAlbums, fetchLatestAlbums, fetchTopAlbums, fetchAlbumDetail } from "../albumActions";

describe('Test album action', () => {
    it('should create fetch search album action', () => {
        const params = { albumId: [ 1, 2 ] }
        const actualResult = fetchSearchAlbums(params);
        const expectedPayload = { loading: true, params }

        expect(actualResult).toBeTruthy()
        expect(actualResult.error).toEqual(false)
        expect(actualResult.payload).toEqual(expectedPayload)
        expect(actualResult.type).toBeTruthy()
    })

    it('should create fetch latest album action success', () => {
        const actualResult = fetchLatestAlbums();
        const expectedPayload = { loading: true }

        expect(actualResult).toBeTruthy()
        expect(actualResult.error).toEqual(false)
        expect(actualResult.payload).toEqual(expectedPayload)
        expect(actualResult.type).toBeTruthy()
    })

    it('should create fetch top album action success', () => {
        const actualResult = fetchTopAlbums();
        const expectedPayload = { loading: true }

        expect(actualResult).toBeTruthy()
        expect(actualResult.error).toEqual(false)
        expect(actualResult.payload).toEqual(expectedPayload)
        expect(actualResult.type).toBeTruthy()
    })

    it('should create fetch album detail action success', () => {
        const actualResult = fetchAlbumDetail(1);
        const expectedPayload = { loading: true, id: 1 }

        expect(actualResult).toBeTruthy()
        expect(actualResult.error).toEqual(false)
        expect(actualResult.payload).toEqual(expectedPayload)
        expect(actualResult.type).toBeTruthy()
    })
})