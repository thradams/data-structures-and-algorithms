[Main](README.md) > [Linked lists](linked_lists.md) > Singly Linked lists


# Singly Linked List


Sample 1

* [ ] item is a reference
* [x] item is a owned reference
* [ ] item is copied
* [x] item is moved
* [ ] item needs destructor
* [x] intrusive


```c
struct book {
    char title[10];
    struct book* next;
};

struct book_list {
    struct book* head, *tail;
};

```

[source → ](linked_lists1.md)
 
 Sample 2
 
* [ ] item is a reference
* [x] item is a owned reference
* [ ] item is copied
* [x] item is moved
* [x] item needs destructor
* [x] intrusive



 ```c
struct book {
    char *title;
    struct book* next;
};

void book_destroy(struct book* book) {
    free(book->title);
}

struct books {
    struct book* head, *tail;
};

```

[source → ](linked_lists1d.md)
 
  
Sample 3
* [ ] item is a reference
* [ ] item is a owned reference
* [x] item is copied
* [ ] item is moved
* [ ] item needs destructor
* [ ] intrusive



```c

struct book {
    char title[10];
};

struct book_list_node {
    struct book book;
    struct book_list_node* next;
};

struct books {
    struct book_list_node* head, *tail;
};

```
[source → ](linked_list2.md)

 
 Sample 4
 
* [x] item is a reference
* [ ] item is a owned reference
* [ ] item is copied
* [ ] item is moved
* [ ] item needs destructor
* [ ] intrusive

 
```c

struct book {
    char title[10];
};

struct book_list_node {
   struct book* data; /*list of non-owner pointers to book*/
   struct book_list_node* next;
};

struct book_list {
     struct book_list_node *head, *tail;
};
```
[source → ](linked_list3.md)

 
 Sample 5
 
* [ ] item is a reference
* [x] item is a owned reference
* [ ] item is copied
* [x] item is moved
* [ ] item needs destructor
* [ ] intrusive


```c

struct book {
    char title[10];
};

struct book_list_node {
   struct book* data; /*list of owner pointers to book*/
   struct book_list_node* next;
};

struct book_list {
     struct book_list_node *head, *tail;
};
```
[source → ](linked_list4.md)



