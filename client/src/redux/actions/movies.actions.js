export const nextPage = () => {
    return {
        type: NEXT_PAGE
    }
}

export const prevPage = () => {
    return {
        type: PREV_PAGE
    }
}

export const loadPage = (number) => {
    return {
        type: LAOD_PAGE,
        payload: number
    }
}