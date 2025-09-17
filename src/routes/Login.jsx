import { useState, useActionState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { LoginUser  } = useAuth();
    
    const navigate = useNavigate();

    const [error, submitAction, isPending] = useActionState(
        async (prevState, formData) => {
            const email = formData.get('email');
            const password = formData.get('password');

            const {
                success,
                data,
                error: signInError,
            } = await LoginUser(email, password)

            if (signInError) return new Error(signInError);

            if (success && data?.session) {
                navigate('/dashboard');
                return null; // No error
            }

            return null;

        }, null
    )

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Вход в систему</h1>
                <p className="login-subtitle">Введите ваши данные для доступа к дашборду</p>

                <form action={submitAction} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="admin@example.com"
                            aria-required="true"
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? 'signin-error' : undefined}
                            disabled={isPending}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="admin123"
                            aria-required="true"
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? 'signin-error' : undefined}
                            disabled={isPending}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        aria-busy={isPending}
                    >
                        {isPending ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Error message */}
                    {error && (
                        <div
                            id="signin-error"
                            role="alert"
                            className="sign-form-error-message"
                        >
                            {error.message}
                        </div>
                    )}
                </form>

                <div className="test-credentials">
                    <p className="test-title">Тестовые данные:</p>
                    <p className="test-info">Email: admin@example.com</p>
                    <p className="test-info">Password: admin123</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
