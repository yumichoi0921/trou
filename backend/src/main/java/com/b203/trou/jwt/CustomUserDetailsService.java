package com.b203.trou.jwt;

import com.b203.trou.entity.user.User;
import com.b203.trou.repository.user.UserRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.security.sasl.AuthenticationException;
@Component("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
//       User user = userRepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("해당하는 유저가 없습니다."));
        System.out.println("아아아아악!!!!!"+username);
        User user = userRepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("해당하는 유저가 없습니다."));
        System.out.println("아아아아악!!!!!"+user.toString());
        return org.springframework.security.core.userdetails.User.builder().username(user.getEmail()).password(user.getPassword()).roles(user.getRole().getKey()).build();

    }
}
