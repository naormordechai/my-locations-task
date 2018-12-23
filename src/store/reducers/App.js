import * as actionTypes from '../actions/actionTypes'
import StorageService from '../../services/StorageService'

const categories = (StorageService.load('requestedCategories') ?
    StorageService.load('requestedCategories') : [{ id: '0.65465465', name: 'Food' }, { id: '0.546886', name: 'Sport' }]);

const locations = (StorageService.load('requestedLocations') ? StorageService.load('requestedLocations') :
    [{
        id: '0.39956465',
        name: 'Ramat Gan',
        address: 'HaBonim St 15, Ramat Gan, Israel',
        coords: {
            lat: 32.0882659,
            lng: 34.8022956,
        },
        category: 'Sport'
    }])

const initialState = {
    activeItem: null,
    activeCategory: { isActive: false, name: '', id: '' },
    categories,
    locations
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
            StorageService.store('requestedCategories', newCategories)
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
            StorageService.store('requestedCategories', copyCategories)
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
            const newLocations = [...state.locations].filter(location => location.id !== action.location.id)
            StorageService.store('requestedLocations', newLocations)
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
            StorageService.store('requestedLocations', copyLocations)
            return {
                ...state,
                locations: copyLocations
            }
        case actionTypes.REMOVE_ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: { isActive: false, name: '', id: '' }
            }
        case actionTypes.REMOVE_ACTIVE_ITEM:
            return {
                ...state,
                activeItem: null,
                activeCategory: { isActive: false, name: '', id: '' },
            }
        case actionTypes.UPDATE_ACTIVE_ITEM:
            return {
                ...state,
                activeItem: action.updatedItem
            }
    }

    return state
}

export default reducer