import { Request, Response } from 'express';
import { supabase } from '../supabase';
import { returnError } from '../../../utils';

const loginController = async (req: Request, res: Response) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    return res.status(400).json(returnError(error.message));
  }

  const { access_token, refresh_token, expires_at } = data.session!;

  return res.json({ access_token, refresh_token, expires_at });
};

export { loginController };
