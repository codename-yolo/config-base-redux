import { applyMiddleware, createStore, compose } from 'redux';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducers';
import { InjectedStore, ApplicationRootState } from './types';

/**
 * reduxSagaMonitorOptions: Công cụ giám sát được sử dụng để theo dõi và gỡ lỗi các Saga trong Redux.
 * middleware: là một lớp trung gian giữa dispatch một action và khi action đến reducer. Nó cho phép bạn gắn các hàm xử lý trung gian để thực hiện các công việc như ghi log, xử lý bất đồng bộ, gọi API, chuyển hướng, kiểm tra quyền truy cập, và nhiều hơn nữa. Middleware nhận action khi nó được gửi đến store và có thể thay đổi action, chuyển tiếp action sang middleware tiếp theo hoặc chặn action.
 * enhancers: Được sử dụng để kết hợp nhiều hàm lại với nhau, từ phải sang trái. Nó cho phép chúng ta sắp xếp và kết hợp các enhancer và middleware để tạo ra một enhancer cuối cùng.
 * compose: Mở rộng và bổ sung chức năng cho redux store như middleware, thunk, saga,...
 */

declare const window: any;

const configureStore: (
    initialState?: ApplicationRootState | Record<string, never>,
) => InjectedStore = (initialState: ApplicationRootState | Record<string, never> = {}) => {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    const { run: runSaga } = sagaMiddleware;

    const middleware = [sagaMiddleware];

    const enhancers = [
        applyMiddleware(...middleware),
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        createReducer({}),
        initialState,
        composeEnhancer(...enhancers),
    ) as InjectedStore;

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    return store;
};

export default configureStore;
