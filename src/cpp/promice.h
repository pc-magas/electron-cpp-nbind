#include "nbind/nbind.h";

#ifndef PROMICE
#define PROMICE

class MyPromice {
    public:
        MyPromice(){};
        ~MyPromice(){};
        void exec();
};


NBIND_CLASS(MyPromice) {
  method(exec);
}

#endif PROMICE