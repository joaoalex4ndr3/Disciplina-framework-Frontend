import fetchMock from "jest-fetch-mock";
import { dogApi,API_BASE_URI  } from "../dogApi";
import {parsedBreedingList}  from "../../test-utils/mocked-data/parsedBreedList";
import breedList  from "../../test-utils/mocked-data/breedList.json";
import { setupApiStore } from "../../test-utils/testUtils";

beforeAll((): void => {
    fetchMock.enableMocks();
});
beforeEach((): void => {
    fetchMock.resetMocks();
});

describe("getBreedList", () => {
    const storeRef = setupApiStore(dogApi);
    fetchMock.mockResponse(JSON.stringify({}));

    test("request is correct", () => {
        return storeRef.store
            .dispatch<any>(
                dogApi.endpoints.getBreedList.initiate(undefined)
            )
            .then(() => {
                expect(fetchMock).toBeCalledTimes(1);
                const { method, url } = fetchMock.mock.calls[0][0] as Request;
                expect(method).toBe("GET");
                expect(url).toBe(`${API_BASE_URI}breeds/list/all`);
            });
    });
    test("successful response", () => {
        const storeRef = setupApiStore(dogApi);
        fetchMock.mockResponse(JSON.stringify(breedList));

        return storeRef.store
            .dispatch<any>(
                dogApi.endpoints.getBreedList.initiate(undefined)
            )
            .then((action: any) => {
                const { status, data, isSuccess } = action;
                expect(status).toBe("fulfilled");
                expect(isSuccess).toBe(true);
                expect(data).toStrictEqual(parsedBreedingList);
                expect(data[0]).toHaveProperty("name");
                expect(data[0]).toHaveProperty("subBreed");
            });
    });
    test("unsuccessful response", () => {
        const storeRef = setupApiStore(dogApi);
        fetchMock.mockReject(new Error("Internal Server Error"));

        return storeRef.store
            .dispatch<any>(
                dogApi.endpoints.getBreedList.initiate(undefined)
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