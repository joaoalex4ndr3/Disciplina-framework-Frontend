import fetchMock from "jest-fetch-mock";
import { dogApi,API_BASE_URI  } from "../dogApi";
import  breedImage  from "../../test-utils/mocked-data/breedImages.json";
import { setupApiStore } from "../../test-utils/testUtils";

beforeAll((): void => {
    fetchMock.enableMocks();
});
beforeEach((): void => {
    fetchMock.resetMocks();
});

describe("getGalleryByBreedName", () => {
    const storeRef = setupApiStore(dogApi);
    fetchMock.mockResponse(JSON.stringify({}));
    const params = {
        name:"bulldog",
        subBreed:"boston"
    }
    test("request is correct", () => {
        return storeRef.store
            .dispatch<any>(
                dogApi.endpoints.getGalleryByBreedName.initiate(params)
            )
            .then(() => {
                expect(fetchMock).toBeCalledTimes(1);
                const { method, url } = fetchMock.mock.calls[0][0] as Request;
                expect(method).toBe("GET");
                expect(url).toBe(`${API_BASE_URI}breed/${params.name}/${params.subBreed}/images`);
            });
    });
    test("successful response", () => {
        const storeRef = setupApiStore(dogApi);
        fetchMock.mockResponse(JSON.stringify(breedImage));

        return storeRef.store
            .dispatch<any>(
                dogApi.endpoints.getGalleryByBreedName.initiate(params)
            )
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(breedImage);
            });
    });
    test("unsuccessful response", () => {
        const storeRef = setupApiStore(dogApi);
        fetchMock.mockReject(new Error("Internal Server Error"));

        return storeRef.store
            .dispatch<any>(
                dogApi.endpoints.getGalleryByBreedName.initiate(params)
            )
            .then((action: any) => {
                const {
                    status,
                    error:{error},
                    isError,
                } = action;
                expect(status).toBe("rejected");
                expect(isError).toBe(true);
                expect(error).toBe("Error: Internal Server Error");
            });
    });
});