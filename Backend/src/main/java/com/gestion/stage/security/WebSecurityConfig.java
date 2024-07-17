package com.gestion.stage.security;
import com.gestion.stage.security.jwt.AuthEntryPointJwt;
import com.gestion.stage.security.jwt.AuthTokenFilter;
import com.gestion.stage.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//@EnableWebSecurity
@EnableGlobalMethodSecurity(
        // securedEnabled = true,
        // jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfig { // extends WebSecurityConfigurerAdapter {
@Autowired
UserDetailsServiceImpl userDetailsService;

@Autowired
private AuthEntryPointJwt unauthorizedHandler;

@Bean
public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
}

@Bean
public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
}

@Bean
public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
}

@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

@Bean   //temchi backend 
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().requestMatchers("/api/**").permitAll()
                .requestMatchers("/api/auth/signin").permitAll()
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/api/auth/signin").permitAll()
                .requestMatchers("/api/test/**").permitAll()
                .requestMatchers("/api/auth/register").permitAll()
                .anyRequest().authenticated();
        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/Offre/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("GET", "POST", "PUT", "DELETE","HEAD","OPTION")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            
            registry.addMapping("/api/Candidature/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("GET", "POST", "PUT", "DELETE","HEAD","OPTION")
                    .allowedHeaders("*")
                    .allowCredentials(true);
                    
        }
    };
}
}

// @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// http.cors().and().csrf().disable()
//     .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//     .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//     .authorizeRequests().requestMatchers("/api/auth/**").permitAll()
//     .requestMatchers("/api/test/**").permitAll()
//     .anyRequest().authenticated();
//     http.authenticationProvider(authenticationProvider());
//     http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//     return http.build();
//   }

// @Bean
// public WebMvcConfigurer corsConfigurer() {
// return new WebMvcConfigurer() {
//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/api/**")
//             .allowedOrigins("http://localhost:4200")
//             .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
//             .allowedHeaders("*")
//             .allowCredentials(true);
//         }
//     };
// }
// @Configuration
// public class WebConfig implements WebMvcConfigurer {
//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**")
//             .allowedOrigins("http://localhost:4200") 
//             .allowCredentials(true)
//             .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","HEAD", "OPTIONS")
//             .allowedHeaders("*");
//     }
// }






//	@Override
//	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
//		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//	}
//	@Bean
//	@Override
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		return super.authenticationManagerBean();
//	}
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		http.cors().and().csrf().disable()
//			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//			.authorizeRequests().antMatchers("/api/auth/**").permitAll()
//			.antMatchers("/api/test/**").permitAll()
//			.anyRequest().authenticated();
//
//		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
//	}
// @Bean
//      public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//          http.cors().and().csrf().disable()
//                  .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//                  .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//                  .authorizeRequests().requestMatchers("/api/**").permitAll()
//                  .requestMatchers("/api/auth/signin").permitAll()
//                  .requestMatchers("/api/**").permitAll()
//                  .requestMatchers("/api/auth/signin").permitAll()
//                  .requestMatchers("/api/test/**").permitAll()
//                  .requestMatchers("/api/auth/register").permitAll()
//                  .anyRequest().authenticated();

//          http.authenticationProvider(authenticationProvider());

//          http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

//          return http.build();
//      }

//  @Bean
// public WebMvcConfigurer corsConfigurer() {
//     return new WebMvcConfigurer() {
//         @Override
//         public void addCorsMappings(CorsRegistry registry) {
//             registry.addMapping("/api/Offre/**")
//                     .allowedOrigins("http://localhost:4200")
//                     .allowedMethods("GET", "POST", "PUT", "DELETE","HEAD","OPTION")
//                     .allowedHeaders("*")
//                     .allowCredentials(true);
            
//             registry.addMapping("/api/Candidature/**")
//                     .allowedOrigins("http://localhost:4200")
//                     .allowedMethods("GET", "POST", "PUT", "DELETE","HEAD","OPTION")
//                     .allowedHeaders("*")
//                     .allowCredentials(true);
                    
//         }
//     };
// }

// @Configuration
// public class WebConfig implements WebMvcConfigurer {
//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**")
//             .allowedOrigins("http://localhost:4200") // Replace with your frontend URL
//             .allowCredentials(true)
//             .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS","HEAD", "OPTIONS")
//             .allowedHeaders("*");
//     }
// }




// @Bean
//     public org.springframework.web.servlet.config.annotation.WebMvcConfigurer corsConfigurer() {
//         return new org.springframework.web.servlet.config.annotation.WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
//                 registry.addMapping("/api/**")
//                         .allowedOrigins("http://localhost:4200")
//                         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                         .allowedHeaders("*")
//                         .allowCredentials(true);
//             }
//         };
//     }



//@Bean
//    public WebMvcConfigurer corsConfig() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:4200")
//                        .allowedMethods(HttpMethod.GET.name(),
//                                HttpMethod.POST.name(),
//                                HttpMethod.DELETE.name())
//                        .allowedHeaders(HttpHeaders.CONTENT_TYPE,
//                                HttpHeaders.AUTHORIZATION);
//            }
//        };
//    }


     

//   @Bean
// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//     http.cors().and().csrf().disable()
//         .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//         .authorizeRequests()
//             .requestMatchers("/api/auth/**", "/api/test/**").permitAll() // Updated
//             .anyRequest().authenticated();

//     http.authenticationProvider(authenticationProvider());
//     http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

//     return http.build();
// }


    
// }