document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const successMsg = document.getElementById('successMsg');

    const setError = (input, message) => {
        const formGroup = input.parentElement;
        const errorEl = formGroup.querySelector('.error-msg');
        errorEl.textContent = message;
        input.classList.add('invalid');
    };

    const clearError = (input) => {
        const formGroup = input.parentElement;
        const errorEl = formGroup.querySelector('.error-msg');
        errorEl.textContent = '';
        input.classList.remove('invalid');
    };

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return re.test(email);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        successMsg.textContent = '';

        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        let isFormValid = true;

        if (fullName.value.trim() === '') {
            setError(fullName, 'Nama lengkap wajib diisi.');
            isFormValid = false;
        } else {
            clearError(fullName);
        }

        if (email.value.trim() === '') {
            setError(email, 'Email wajib diisi.');
            isFormValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            setError(email, 'Format email tidak valid.');
            isFormValid = false;
        } else {
            clearError(email);
        }

        if (password.value === '') {
            setError(password, 'Password wajib diisi.');
            isFormValid = false;
        } else if (password.value.length < 8) {
            setError(password, 'Password minimal 8 karakter.');
            isFormValid = false;
        } else {
            clearError(password);
        }

        if (confirmPassword.value === '') {
            setError(confirmPassword, 'Konfirmasi password wajib diisi.');
            isFormValid = false;
        } else if (confirmPassword.value !== password.value) {
            setError(confirmPassword, 'Password tidak cocok.');
            isFormValid = false;
        } else {
            clearError(confirmPassword);
        }

        if (isFormValid) {
            successMsg.textContent = 'Pendaftaran Berhasil';
            form.reset();
        }
    });
});