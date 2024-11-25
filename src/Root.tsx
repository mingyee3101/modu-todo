import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // 실패한 쿼리를 자동 재시도하지 않음
            refetchOnWindowFocus: false, // 창이 포커스될 때 다시 가져오지 않음
        },
        mutations: {
            // mutation의 기본 옵션 설정 (필요시 추가)
        },
    },
});

const Root: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
};

export default Root;
