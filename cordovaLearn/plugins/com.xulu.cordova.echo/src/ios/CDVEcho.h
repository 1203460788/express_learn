/********* Echo.h Cordova Plugin Header *******/
#import <Cordova/CDV.h>

@interface CDVEcho : CDVPlugin

- (void)echo:(CDVInvokedUrlCommand*)command;

@end