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
import { Send } from 'react-feather';
import { motion } from 'framer-motion';

const Contact = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='grid relative place-items-center h-[80vh] md:h-screen'>
			<motion.div
				initial={{ y: -50, scale: 0.5, opacity: 0 }}
				animate={{ y: 0, scale: 1, opacity: 1 }}
				transition={{
					duration: 0.5,
				}}
				className='w-full max-w-md'>
				<Card className='max-w-md bg-slate-100/10 w-full text-slate-100 p-12 relative z-10 backdrop-blur-3xl'>
					<CardHeader className='space-y-1 items-center'>
						<CardTitle className='text-2xl font-bold tracking-wide'>
							Contact Us
						</CardTitle>
						<CardDescription>write your query to us</CardDescription>
					</CardHeader>
					<form
						action=''
						onSubmit={(e) => {
							e.preventDefault();
							console.log(user);
						}}>
						<CardContent className='grid gap-4'>
							<div className='grid gap-2'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									type='text'
									name='name'
									onChange={handleChange}
									value={user.name}
									placeholder='John doe'
									className='placeholder:text-slate-400'
								/>
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
								<Label htmlFor='message'>mesage</Label>
								<Input
									name='Message'
									value={user.message}
									id='message'
									onChange={handleChange}
									placeholder='hello i am interested in ...'
									className='placeholder:text-slate-400 h-24'
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button
								type='submit'
								variant={'destructive'}
								className='w-full bg-[#8530ce] hover:bg-[#8530ce]/80'>
								<Send
									className='mr-2 h-4 w-4'
									color='rgba(255,255,255,0.8'
								/>
								Send now
							</Button>
						</CardFooter>
					</form>
				</Card>
			</motion.div>
			<div className='absolute w-60 h-60 rotate-45 bg-[#8530ce]/80 rounded-full -z-10' />
		</div>
	);
};

export default Contact;
