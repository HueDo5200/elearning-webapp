package com.spring.elearningweb.util;

class A {
    private int x = 10;
    private String name;
    public A() {
        System.out.print("A");
    }

    public void setName(String name) {
        this.name = name;
    }
public String getName() {
        return this.name;
}
    public void total(A a) {
        a.x = 1;
        a.setName("Nana-2");
        System.out.println(a.x);
    }
}

class B extends A {
    public B() {
        System.out.print("B");
    }
}

class C extends B {
    public C() {
        System.out.print("C");
    }
}

public class Quiz {
    public static void main(String[] args) {
        C c = new C();
        A a = new A();
        a.setName("Nana");
        a.total(a);
        System.out.println(a.getName());
        changeName(a);
    }

    static void changeName(A a) {
        a.setName("tokyo");
        System.out.println(a.getName());
    }
}