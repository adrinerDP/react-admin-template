import React, { useEffect } from 'react';
import { z } from 'zod';
import { useAuth } from '@/hocs/authentication-context.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { cn, runResult } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { useNavigate, useParams } from 'react-router';
import { useError } from '@/hooks/use-error.ts';

const loginForm = z
  .object({
    username: z.string().nonempty('아이디를 입력하세요'),
    password: z.string().nonempty('비밀번호를 입력하세요'),
  })
  .required();

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, isLoggedIn } = useAuth();
  const { redirect } = useParams();

  const { handleHTTPError } = useError({
    messages: {
      USER_NOT_FOUND: {
        title: '로그인하지 못했어요',
        description: '아이디와 비밀번호를 다시 확인해주세요.',
      },
    },
  });

  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: z.infer<typeof loginForm>) => {
    const result = await runResult(
      signIn({ username: data.username, password: data.password }),
    );

    if (result.type === 'failure') return handleHTTPError(result.error);
  };

  useEffect(() => {
    if (isLoggedIn === 'valid') {
      if (redirect) navigate(redirect);
      else navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6')}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">로그인</CardTitle>
              <CardDescription>
                템플릿 어드민 접근을 위해 로그인 해주세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>아이디</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="아이디를 입력하세요"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>비밀번호</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit">로그인</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
