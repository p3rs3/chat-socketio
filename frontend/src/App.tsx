import { Layout } from 'antd';
import { AppRouter } from './components/AppRouter';
import styled from 'styled-components';
import './App.css';

const LayoutWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

function App() {
	return (
		<LayoutWrapper>
			<Layout style={{display: 'flex', minHeight: '100vh', justifyContent: 'center'}}>
				<AppRouter />
			</Layout>
		</LayoutWrapper>	
	);
}

export default App;
