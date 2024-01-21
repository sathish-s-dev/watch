// import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useState } from 'react';
import { GitHub } from 'react-feather';

const CreateAccount = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='grid relative place-items-center h-[80vh] md:h-screen'>
			<Card className='max-w-2xl bg-slate-100/10 text-slate-100 p-12 relative z-10 backdrop-blur-3xl'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl'>Create an account</CardTitle>
					<CardDescription>
						Enter your email below to create your account
					</CardDescription>
				</CardHeader>
				<form
					action=''
					onSubmit={(e) => {
						e.preventDefault();
						console.log(user);
					}}>
					<CardContent className='grid gap-4'>
						<div className='grid grid-cols-2 gap-6'>
							<Button
								variant='secondary'
								className='space-x-2'>
								<GitHub
									size={16}
									className='mr-1'
								/>
								Github
							</Button>
							<Button variant='secondary'>Google</Button>
						</div>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-slate-900 px-2 text-muted-slate-100'>
									Or continue with
								</span>
							</div>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								name='email'
								onChange={handleChange}
								value={user.email}
								placeholder='m@example.com'
								className='placeholder:text-slate-400'
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								name='password'
								value={user.password}
								id='password'
								onChange={handleChange}
								type='password'
								placeholder='*****'
								className='placeholder:text-slate-400'
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							variant={'destructive'}
							className='w-full bg-[#8530ce] hover:bg-[#8530ce]/80'>
							Create account
						</Button>
					</CardFooter>
				</form>
			</Card>
			<div className='absolute w-60 h-60 rotate-45 bg-[#8530ce]/80 rounded-full -z-10' />
		</div>
	);
};

export default CreateAccount;
