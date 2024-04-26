const BASE_PATH = "https://api.hh.ru/"

export const HeadHunterService = {
    async vacancies(page: number, text: string) {
        return await fetch(`${BASE_PATH}vacancies?page=${page}&text=${text}`, {
            method: "get",
        }).then((res) => res.json())
    }
}