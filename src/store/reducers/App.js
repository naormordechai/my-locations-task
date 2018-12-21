import * as actionTypes from '../actions/actionTypes'

const initialState = {
    activeItem: null,
    activeCategory: { isActive: false, name: '', id: '' },
    categories: [
        {
            id: '0.1654654',
            name: 'Food',
        },
        {
            id: '0.15548468',
            name: 'Sport'
        },
        {
            id: '0.888486',
            name: 'Action'
        }
    ],
    locations: [
        {
            id: '0.1546877',
            name: 'Tel-Aviv',
            address: 'Sokolov 87, Tel Aviv',
            coords: {
                lat: 32.093,
                lng: 34.778,
            },
            category: 'Food'
        },
        {
            id: '0.39956465',
            name: 'Ramat Gan',
            address: 'HaBonim St 15, Ramat Gan, Israel',
            coords: {
                lat: 32.0882659,
                lng: 34.8022956,
            },
            category: 'Sport'
        },
        {
            id: '0.1748465',
            name: 'Ramat Gan',
            address: 'Anne Frank 16, Ramat Gan',
            coords: {
                lat: 32.088,
                lng: 34.801,
            },
            category: 'Action'
        },

    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACTIVE_CATEGORY:
            if (action.category.isActive) {
                return {
                    ...state,
                    activeItem: action.category,
                    activeCategory: action.category
                }
            } else {
                return {
                    ...state,
                    activeItem: action.category,
                }
            }

        case actionTypes.ADD_CATEGORY:
            return {
                ...state,
                categories: state.categories.concat(action.category)
            }
        case actionTypes.REMOVE_CATEGORY:
            const newCategories = [...state.categories].filter(category => category.id !== action.category.id)
            return {
                ...state,
                categories: newCategories
            }
        case actionTypes.UPDATE_CATEGORY:
            const indexCategory = [...state.categories].findIndex(category => {
                return category.id === action.category.id
            })
            const copyCategories = [...state.categories]
            copyCategories[indexCategory] = action.category
            return {
                ...state,
                categories: copyCategories
            }
        case actionTypes.ADD_LOCATION:
            return {
                ...state,
                locations: state.locations.concat(action.location)
            }
        case actionTypes.REMOVE_LOCATION:
            const newLocations = [...state.locations].filter(location => {
                return location.id !== action.location.id
            })
            return {
                ...state,
                locations: newLocations
            }
        case actionTypes.UPDATE_LOCATION:
            const indexLocation = [...state.locations].findIndex(location => {
                return location.id === action.location.id
            })
            const copyLocations = [...state.locations]
            copyLocations[indexLocation] = action.location
            return {
                ...state,
                locations: copyLocations
            }
        case actionTypes.REMOVE_ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: {
                    ...state.activeCategory,
                    isActive: action.f
                }
            }
    }

    return state
}

export default reducer