import yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

const schema = yup.object().shape({
  name: yup.string().min(2).max(24).required(),
  email: yup.string().email().required(),
  password: yup.string().password().min(8).minUppercase(1).minNumbers(1).minSymbols(1).required(),
});

export const signupValidation = async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((e) => ({ [e.path]: e.message }));
    res.status(400).json({ errors });
  }
};
